import { EntityRepository, Repository } from "typeorm";
import { Table10 } from "./table-10.entity";

@EntityRepository(Table10)
export class Table10Repository extends Repository<Table10> {}