import { Injectable } from '@nestjs/common';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { Inject } from '@nestjs/common';
import { ClickHouseClient } from '@depyronick/nestjs-clickhouse';
import { GroupAnalyticInput } from './dto/group-analytic.input';

interface CandidateTable {
  name: string;
  campaignId: string;
  age: number;
  workTime: string;
  position: string;
  salary?: number;
  yearsOfExperience?: number;
  location: string;
  createdAt: string;
}

@Injectable()
export class CandidateService {
  constructor(
    @Inject('ANALYTIC_DB')
    private analyticsServer: ClickHouseClient,
  ) {}

  async create(createCandidateInput: CreateCandidateInput) {
    const response = await this.analyticsServer.insertPromise<CandidateTable>(
      'candidates',
      [createCandidateInput],
    );

    return response;
  }

  async rangeAnalytic(range: number = 31) {
    const response = await this.analyticsServer.queryPromise<{
      date: Date;
      count: number;
    }>(
      `SELECT
          date,
          COALESCE(candidates_by_day.count, 0) AS count
        FROM
        (
          SELECT 
              toDate(now() - INTERVAL number DAY) AS date
          FROM 
              numbers(${range})
        ) AS date_range
        LEFT JOIN
        (
          SELECT
              toDate(createdAt) AS date,
              COUNT(1) AS count
          FROM
              hireHubTest.candidates
          WHERE
              createdAt >= toUnixTimestamp(now() - INTERVAL ${range} DAY)
          GROUP BY
              date
        ) AS candidates_by_day
        ON date_range.date = candidates_by_day.date
        ORDER BY
          date ASC`,
    );

    return response;
  }

  async groupByField(groupAnalyticInput: GroupAnalyticInput) {
    const response = await this.analyticsServer.queryPromise<{
      metric: number;
      count: number;
    }>(
      `SELECT
      ${groupAnalyticInput.field} AS metric,
      COUNT(1) AS count
      FROM
          hireHubTest.candidates
      GROUP BY
        ${groupAnalyticInput.field}  
      ORDER BY
          metric`,
    );

    return response;
  }

  findAll() {
    return `This action returns all candidate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidate`;
  }

  update(id: number, updateCandidateInput: UpdateCandidateInput) {
    return `This action updates a #${id} candidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidate`;
  }
}
