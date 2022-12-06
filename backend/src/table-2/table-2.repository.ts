import { EntityRepository, Repository } from "typeorm";
import { Table2 } from "./table-2.entity";

@EntityRepository(Table2)
export class Table2Repository extends Repository<Table2> {}