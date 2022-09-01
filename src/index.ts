import { loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'
import { Command } from 'commander'
import { ProtoGrpcType } from './proto/books'
import { BooksServer } from './services'

const program = new Command('ICS-Library-Crawler')
  .option('-p, --port [port]', 'port for rpc to listen', '3000')
  .parse()

const PROTO_PATH = './proto/books.proto'
const packageDefinition = loadSync(PROTO_PATH)
const proto = (loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType

const server = new Server()
server.addService(proto.crawler.Books.service, BooksServer)

const port = program.getOptionValue('port') as number
const uri = `localhost:${port}`
console.log(`Listening on ${uri}`)
server.bind(uri, ServerCredentials.createInsecure())

server.start()
