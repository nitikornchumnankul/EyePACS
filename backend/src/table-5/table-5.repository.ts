import { EntityRepository, Repository } from "typeorm";
import { Table5 } from "./table-5.entity";

@EntityRepository(Table5)
export class Table5Repository extends Repository<Table5> {}