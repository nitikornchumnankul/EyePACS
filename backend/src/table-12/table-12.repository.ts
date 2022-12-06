import { EntityRepository, Repository } from "typeorm";
import { Table12 } from "./table-12.entity";

@EntityRepository(Table12)
export class Table12Repository extends Repository<Table12> {}