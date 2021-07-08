import { PrismaClient } from '@prisma/client'
import { PubSub } from 'apollo-server'
import { Request, Response } from 'express'
// import { IncomingMessage } from 'http'

export interface Context {
  db: PrismaClient
  req: Request
  res: Response
  // pubsub: PubSub
  // userId: number
  currentUser: any
}

// export interface SocketContext {
//   prisma: PrismaClient
//   req: IncomingMessage
//   pubsub: PubSub
// }

export interface Token {
  userId: number
  type: string
  timestamp: number
}
