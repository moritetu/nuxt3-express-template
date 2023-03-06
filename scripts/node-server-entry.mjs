#!/bin/env/node
import fs from 'fs'

process.env.NITRO_SSL_CERT = fs.readFileSync('server.crt')
process.env.NITRO_SSL_KEY = fs.readFileSync('server.key')

await import('./.output/server/index.mjs')
