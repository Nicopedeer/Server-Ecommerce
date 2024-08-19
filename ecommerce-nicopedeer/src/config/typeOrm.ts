import { registerAs } from '@nestjs/config'
import {config as dotenvConfig} from 'dotenv'
import { Categories } from 'src/entities/Categories.entity'
import { OrderDetails } from 'src/entities/OrderDetails.entity'
import { Orders } from 'src/entities/Orders.entity'
import { Products } from 'src/entities/Products.entity'
import { Users } from 'src/entities/Users.entity'
import { DataSource, DataSourceOptions } from 'typeorm'
dotenvConfig({path:'.env'})

const config ={
    type:'postgres',
    database:process.env.DB_NAME,
    host:process.env.DB_HOST,
    port:Number(process.env.DB_HOST),
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    entities:[Products, Users, Orders, OrderDetails, Categories ],
    migrations: ['dist/migrations/*{.ts,.js}'], 
    logging: false,
    synchronize : true,
    dropSchema: true,
}

export const typeOrmConfig = registerAs('typeorm', () => config )
export const connectionsSource = new DataSource(config as DataSourceOptions)