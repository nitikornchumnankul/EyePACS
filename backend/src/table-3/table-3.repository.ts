import { EntityRepository, Repository } from "typeorm";
import { Table3 } from "./table-3.entity";

@EntityRepository(Table3)
export class Table3Repository extends Repository<Table3> {}