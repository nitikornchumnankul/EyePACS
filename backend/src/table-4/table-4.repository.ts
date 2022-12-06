import { EntityRepository, Repository } from "typeorm";
import { Table4 } from "./table-4.entity";

@EntityRepository(Table4)
export class Table4Repository extends Repository<Table4> {}