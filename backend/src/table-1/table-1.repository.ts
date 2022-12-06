import { EntityRepository, Repository } from "typeorm";
import { Table1 } from "./table-1.entity";

@EntityRepository(Table1)
export class Table1Repository extends Repository<Table1> {}