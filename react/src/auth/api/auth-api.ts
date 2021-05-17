import Result from '@app/@code-fights/core/result';
import UnitResponse from '@app/@code-fights/core/unit-response';
import { Utils } from '@app/@code-fights/core/utils';
import { LoginProps, LoginResponse, SignupProps } from '@app/auth/api/types';
import axios from 'axios';

const baseURL = `http://localhost:8000`;

export interface IAuthApi {
  login(properties: LoginProps): Promise<Result<any>>;

  signup(properties: SignupProps): Promise<Result<any>>;
}

class AuthApi implements IAuthApi {
  httpClient: any;

  constructor() {
    this.httpClient = axios.create({
      baseURL: baseURL,
      headers: { Accept: 'application/json' }
    });

    this.httpClient.defaults.withCredentials = true;
  }

  async login(properties: LoginProps): Promise<Result<LoginResponse>> {
    try {
      console.log(Utils.keysToSnake(properties));
      const response = await this.httpClient.post(
        '/accounts/token/',
        Utils.keysToSnake(properties)
      );
      return Result.success<LoginResponse>(Utils.keysToCamel(response.data));
    } catch (error) {
      return Result.failed<LoginResponse>(error);
    }
  }

  async signup(properties: SignupProps): Promise<Result<UnitResponse>> {
    try {
      const response = await this.httpClient.post(
        '/accounts/register/',
        Utils.keysToSnake(properties)
      );
      return Result.success<UnitResponse>(Utils.keysToCamel(response.data));
    } catch (error) {
      return Result.failed<UnitResponse>(error);
    }
  }
}

const authApi = new AuthApi();

export default authApi;
