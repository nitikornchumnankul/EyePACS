import { EntityRepository, Repository } from "typeorm";
import { Table7 } from "./table-7.entity";

@EntityRepository(Table7)
export class Table7Repository extends Repository<Table7> {}