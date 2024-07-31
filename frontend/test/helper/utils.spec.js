import { setCompany, getCompany, setApplication, getApplication } from '../../helper/utils';

describe('Utils Functions', () => {
  it('Should set and get the company_id correctly', () => {
    setCompany('1');
    const result = getCompany();
    expect(result).toBe('1');
  });

  it('Should set and get the application_id correctly', () => {
    setApplication('000000000000000000000001');
    const result = getApplication();
    expect(result).toBe('000000000000000000000001');
  });
});
