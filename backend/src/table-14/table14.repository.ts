import { EntityRepository, Repository } from "typeorm";
import { Table14 } from "./table-14.entity";

@EntityRepository(Table14)
export class Table14Repository extends Repository<Table14> {}