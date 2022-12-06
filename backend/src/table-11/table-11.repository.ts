import { EntityRepository, Repository } from "typeorm";
import { Table11 } from "./table-11.entity";

@EntityRepository(Table11)
export class Table11Repository extends Repository<Table11> {}