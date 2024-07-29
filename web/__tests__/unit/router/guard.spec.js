import { routeGuard } from '../../../router/guard';
import { setCompany, setApplication } from '../../../helper/utils';

jest.mock('../../../helper/utils', () => ({
  setCompany: jest.fn(),
  setApplication: jest.fn()
}));

describe('RouteGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should call setCompany with company_id from route params', () => {
    const to = { params: { company_id: '1' } };
    const from = {};
    const next = jest.fn();

    routeGuard(to, from, next);

    expect(setCompany).toHaveBeenCalledWith('1');
    expect(setApplication).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('Should call setApplication with application_id from route params', () => {
    const to = { params: { application_id: '000000000000000000000001' } };
    const from = {};
    const next = jest.fn();

    routeGuard(to, from, next);

    expect(setApplication).toHaveBeenCalledWith('000000000000000000000001');
    expect(setCompany).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

});
