const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require("path");
const sqlite3 = require('sqlite3').verbose();
const serveStatic = require("serve-static");
const { readFileSync } = require('fs');
const { setupFdk } = require("fdk-extension-javascript/express");
const { SQLiteStorage } = require("fdk-extension-javascript/express/storage");
const sqliteInstance = new sqlite3.Database('session_storage.db');
const productRouter = express.Router();


const fdkExtension = setupFdk({
    api_key: process.env.EXTENSION_API_KEY,
    api_secret: process.env.EXTENSION_API_SECRET,
    base_url: process.env.EXTENSION_BASE_URL,
    callbacks: {
        auth: async (req) => {
            // Write you code here to return initial launch url after auth process complete
            if (req.query.application_id)
                return `${req.extension.base_url}/company/${req.query['company_id']}/application/${req.query.application_id}`;
            else
                return `${req.extension.base_url}/company/${req.query['company_id']}`;
        },
        
        uninstall: async (req) => {
            // Write your code here to cleanup data related to extension
            // If task is time taking then process it async on other process.
        }
    },
    storage: new SQLiteStorage(sqliteInstance,"exapmple-fynd-platform-extension"), // add your prefix
    access_mode: "online",
});

const STATIC_PATH = process.env.NODE_ENV === 'production'
    ? path.join(process.cwd(), 'frontend', 'dist')
    : path.join(process.cwd(), 'frontend');
    
const app = express();
const platformApiRoutes = fdkExtension.platformApiRoutes;

// Middleware to parse cookies with a secret key
app.use(cookieParser("ext.session"));

// Middleware to parse JSON bodies with a size limit of 2mb
app.use(bodyParser.json({
    limit: '2mb'
}));

// Serve static files from the Vue dist directory
app.use(serveStatic(STATIC_PATH, { index: false }));

// FDK extension handler and API routes (extension launch routes)
app.use("/", fdkExtension.fdkHandler);

productRouter.get('/', async function view(req, res, next) {
    try {
        const {
            platformClient
        } = req;
        const data = await platformClient.catalog.getProducts()
        return res.json(data);
    } catch (err) {
        next(err);
    }
});

// Get products list for application
productRouter.get('/application/:application_id', async function view(req, res, next) {
    try {
        const {
            platformClient
        } = req;
        const { application_id } = req.params;
        const data = await platformClient.application(application_id).catalog.getAppProducts()
        return res.json(data);
    } catch (err) {
        next(err);
    }
});

async function createProducts(platformClient, companyId) {
    
    // Helper function to generate a random integer within a given range
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Create brand
    let randomBrandName = `Polo_${getRandomInt(1000, 9999)}`;
    let randomBrandSlug = `polo_${getRandomInt(1000, 9999)}`;
    const brand = await platformClient.companyProfile.createBrand({
        "body": {
            "company_id": companyId,
            "description": "Jeans brand",
            "logo": "value",
            "banner": {
                "portrait": "value",
                "landscape": "value"
            },
            "uid": 1,
            "name": randomBrandName,
            "slug_key": randomBrandSlug
        }
    });

    // Fetch department
    const departments = await platformClient.catalog.listDepartmentsData({ "slug": "fashion" });
    let department = departments?.items ? departments.items[0] : {};

    // Fetch product template
    const productTemplates = await platformClient.catalog.listProductTemplateCategories({
        "departments": department.slug,
        "itemType": "standard"
    });
    let productTemplate = productTemplates?.items ? productTemplates.items[0] : {};

    // Fetch category
    let categories = await platformClient.catalog.listCategories({
        "department": department.uid,
        "slug": "jeans"
    });
    let category = categories?.items ? categories.items[0] : {};

    // Fetch HSN codes
    const hsncodes = await platformClient.catalog.getAllProductHsnCodes();
    let hsncode = hsncodes?.items ? hsncodes.items[0] : {};
    
    // Add selling location
    let randomSellingLlocation = `HighStreet_${getRandomInt(1000, 9999)}`;
    const sellingLocation = await platformClient.companyProfile.createLocation({
        "body": {
            "company": companyId,
            "name": "High Street",
            "display_name": "High Street",
            "code": randomSellingLlocation,
            "store_type": "high_street",
            "contact_numbers": [
              {
                "number": "745028057",
                "country_code": 91
              }
            ],
            "address": {
              "address1": "Test",
              "country": "India",
              "pincode": 380052,
              "city": "Ahmedabad",
              "state": "Gujarat",
              "latitude": 19.0653252,
              "longitude": 72.8423802,
              "country_code": "IN"
            },
            "manager": {
              "name": "Jinal Virani",
              "email": "jinalvirani@gofynd.com",
              "mobile_no": {
                "number": "745028057",
                "country_code": 91
              }
            },
            "stage": "verified",
            "notification_emails": [
              "jinalvirani@gofynd.com"
            ],
            "documents": [
              
            ]
          }
    });
    
    // Create 10 random products
    for (let i = 1; i <= 10; i++) {
        let randomProductName = `Product_${i}_${getRandomInt(1000, 9999)}`;
        let randomSlug = `product_${i}_${getRandomInt(1000, 9999)}`;
        let randomSize = ['S', 'M', 'L', 'XL', 'XXL', '3XL'][getRandomInt(0, 5)];
        let sku_code = `SKU_${i}_${getRandomInt(1000, 9999)}`;
        const productPromise = await platformClient.catalog.createProduct({
            "body": {
                "media": [{
                    "url": "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/135x0/dKAL_j-we-61PZIiP7DeL._SY879_.jpg",
                    "type": "image"
                }],
                "_custom_json": {},
                "action": "upsert",
                "attributes": {
                    "gender": ["Men"],
                    "essential": "Yes",
                    "primary_color": "Black",
                    "net-quantity": "1 N",
                    "marketer-name": "Test",
                    "marketer-address": "Andheri",
                    "primary_material": "Aluminum"
                },
                "brand_uid": brand.uid,
                "category_slug": category.slug,
                "company_id": companyId,
                "country_of_origin": "India",
                "currency": "INR",
                "departments": [department.uid],
                "item_code": `ItemCode_${i}_${getRandomInt(1000, 9999)}`,
                "item_type": "standard",
                "name": randomProductName,
                "return_config": {
                    "returnable": true,
                    "time": 1,
                    "unit": "days"
                },
                "sizes": [
                    {
                        "currency": "INR",
                        "identifiers": [
                            {
                                "gtin_type": "sku_code",
                                "gtin_value": sku_code,
                                "primary": true
                            }
                        ],
                        "is_set": false,
                        "price": 10000,
                        "price_effective": 10000,
                        "price_transfer": 0,
                        "size": randomSize,
                        "item_length": 10.0,
                        "item_width": 10.0,
                        "item_weight": 100.0,
                        "item_height": 100.0
                    }
                ],
                "slug": randomSlug,
                "tax_identifier": {
                    "hsn_code_id": hsncode.hsn_code_id,
                    "reporting_hsn": hsncode.reporting_hsn,
                    "hsn_code": hsncode.hsn_code
                },
                "template_tag": productTemplate.template_slug,
                "trader": [{
                    "type": "Manufacturer",
                    "name": "Test",
                    "address": ["Andheri"]
                }]
            }
        });
        await new Promise(resolve => setTimeout(resolve, 5000));
        await platformClient.catalog.updateRealtimeInventory({
            "itemId": productPromise.uid,
            "sellerIdentifier": sku_code,
            "body": {
              "company_id": companyId,
                "payload":[{
                    "seller_identifier": sku_code,
                    "store_id": sellingLocation.uid,
                    "total_quantity":1,
                }]
              }
        });
    }
    return true;
}

// Add new product
productRouter.post('/', async function view(req, res, next) {
    try {
        const {
            platformClient
        } = req;
        const companyId = req.headers['x-company-id'];
        const response = await createProducts(platformClient, companyId);
        return res.json(response);
    } catch (err) {
        next(err);
    }
});

// productRouter.post('/application/:application_id', async function view(req, res, next) {
//     try {
//         const {
//             platformClient
//         } = req;
//         const companyId = req.headers['x-company-id'];
       
//         const productCreationPromises = await createProducts(platformClient, companyId);
//         const productList = await platformClient.catalog.getProducts({})
        
//         // const response = await platformClient.companyProfile.getLocationDetail({
//         //     "locationId": `${location.uid}`
//         //   });
        
//         // const response1 = await platformClient.catalog.updateRealtimeInventory({
//         //     "itemId": productCreationPromises[0].uid,
//         //     "sellerIdentifier": "SKU_TEST25",
//         //     "body": {
//         //       "company_id": companyId,
//         //         "payload":[{
//         //             "seller_identifier":"SKU_TEST25",
//         //             "store_id": location.uid,
//         //             "total_quantity":10,
//         //         }]
//         //       }
//         // });
        
//         return res.json(response)
//     } catch (err) {
//         next(err);
//     }
// });

// FDK extension api route which has auth middleware and FDK client instance attached to it.
platformApiRoutes.use('/products', productRouter);

// If you are adding routes outside of the /api path, 
// remember to also add a proxy rule for them in /frontend/vite.config.js
app.use('/api', platformApiRoutes);

// Serve the Vue app for all other routes
app.get('*', (req, res) => {
    return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(path.join(STATIC_PATH, "index.html")));
});

module.exports = app;
