import { TokenPayload } from '../tokens/types/token-payload.interface';

declare global {
  namespace Express {
    interface User extends TokenPayload {
      refreshToken?: string;
    }
  }
}
