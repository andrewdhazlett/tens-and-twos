import {NextApiRequest, NextApiResponse} from 'next';
import helloRoute from './hello';

describe('helloRoute', () => {
  it('says hello', () => {
    const req: Partial<NextApiRequest> = {};
    const res: Partial<NextApiResponse> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    helloRoute(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(200);
    expect((res.json as jest.Mock).mock.calls).toEqual([[{text: 'Hello'}]]);
  });
});
