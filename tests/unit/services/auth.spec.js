import auth from '../../../src/services/auth'
jest.mock('../../../src/services/session-storage', () => jest.fn());

describe('auth', () => {
  it('Should login / logout', async () => {
    auth.login('token');
    expect(auth.token).toBe('token');

    auth.logout();
    expect(auth.token).toBe(null);
  })
})