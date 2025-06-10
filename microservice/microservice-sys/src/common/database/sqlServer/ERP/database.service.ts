import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, QueryRunner } from 'typeorm';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'src/common/utils/constants';

@Injectable()
export class DatabaseService {
  private queryRunner: QueryRunner;

  constructor(@InjectConnection('ERP') private readonly ERP: Connection) {
    this.queryRunner = this.ERP.createQueryRunner();
    this.checkConnection();
  }

  private async checkConnection() {
    try {
      if (this.ERP.isConnected) {
        console.log(SUCCESS_MESSAGES.SUCCESS_ERP);
      } else {
        console.error(ERROR_MESSAGES.ERROR_ERP);
      }
    } catch (error) {
      console.error(ERROR_MESSAGES.DATABASE_ERROR, error);
    }
  }

  async executeQuery(query: string): Promise<any> {
    const queryRunner = this.ERP.createQueryRunner();
    await queryRunner.connect();

    try {
      return await queryRunner.query(query);
    } catch (error) {
      return { success: false, message: 'An error occurred while executing the query.' };
    } finally {
      await queryRunner.release();
    }
  }

  async executeQueryParams(query: string, params: any[]): Promise<any> {
    const queryRunner = this.ERP.createQueryRunner();
    await queryRunner.connect();

    try {
      return await queryRunner.query(query, params);
    } catch (error) {
      return { success: false, message: 'An error occurred while executing the query.' };
    } finally {
      await queryRunner.release();
    }
  }





  async executeQueryTest(query: string): Promise<any> {
    try {
      const result = await this.queryRunner.query(query);

      if (Array.isArray(result)) {
        return result;
      }

      return { message: 'Query executed successfully', result: result };
    } catch (error) {
      throw error;
    }
  }


  async findAuthByEmpID(UserId: string): Promise<any> {
    const queryRunner = this.ERP.createQueryRunner();
    await queryRunner.connect();
    const query = `SELECT * FROM "_ERPUser_WEB" WHERE "UserId" = '${UserId}'`;
    try {
      const result = await queryRunner.query(query);

      if (!result || result.length === 0) {
        throw new NotFoundException(`UserId ${UserId} not found in the system`);
      }

      return result[0];
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async checkAuthUserSeq(UserSeq: number): Promise<any> {
    const queryRunner = this.ERP.createQueryRunner();
    await queryRunner.connect();
    const query = `SELECT * FROM "_ERPUser_WEB" WHERE "UserSeq" = '${UserSeq}'`;

    try {
      const result = await queryRunner.query(query);

      if (!result || result.length === 0) {
        throw new NotFoundException(`UserSeq ${UserSeq} not found in the system`);
      }

      return result[0];
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async findLanguageSeq(languageSeq: string): Promise<any> {
    const queryRunner = this.ERP.createQueryRunner();
    await queryRunner.connect();
    const query = `SELECT  * FROM _ERPDictionary_WEB where LanguageSeq ='${languageSeq}'`;
    try {
      const result = await queryRunner.query(query);
      return result;
    } catch (error) {
      throw error;
    }
    finally {
      await queryRunner.release();
    }
  }



}
