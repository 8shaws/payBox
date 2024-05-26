import * as dotenv from "dotenv";
import { Process } from "@paybox/common";
dotenv.config();

export const PROCESS = process.env.PROCESS || Process.Dev;

export const SOLANA_ADDRESS = process.env.SOLANA_ADDRESS || "";

export const ETH_ADDRESS = process.env.ETH_ADDRESS || "";

export const BTC_ADDRESS = process.env.BTC_ADDRESS || "";

export const SEPOLIA_URL = process.env.SEPOLIA_URL || "";

export const SEPOLIA_URL_HTTP = process.env.SEPOLIA_URL_HTTP || "";

export const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID || "";

export const HASURA_URL =
  process.env.HASURA_URL || "http://localhost:8112/v1/graphql";

export const HASURA_ADMIN_SECRET =
  process.env.HAURA_ADMIN_SECRET || "myadminsecret";

export const JWT =
  process.env.AUTH_JWT ||
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjY0MjQ3NzE2fQ.RMvnfvZtfhgQvCGj5HeT_4qDk1jjGTVLvO4hXQhxvH1QOU3E4yWv5rqDwhGeH9m2aZh7EiV8s3zQ70XkvPV-TA";

export const AUTH_JWT_PUBLIC_KEY =
  process.env.AUTH_JWT_PUBLIC_KEY ||
  "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqx+7XJxJR+0Lp8hLFKYr5Gc+0RPIdaZJ18GH8b//oMn7PCVe0gLQDkxjvhKo2ySMgWSOSGaNJkZXLhN4jlot/xaulN3dSbrgQPxvx3ALd3nXJaTLOb7xBODd196r+Ylg1QPICdrBQVi6qAXacq/UBK8K7BWQ0TG2/R9aB5mNSGtY3Ogj9xp2MP5LTi7f2Alj6IwSFRN+9SCmH3NiQzNUPBWJB02Lgx1oxwtfevkQ3BpwIqzkOTTE1G7PXgKbYRBUlUNqwvMIjk89tRf/qHgMbRPGYYNu7XoRt8AOVgNFUcL51Gb9vM75XstWoAh6BwYQsceEXUU7dgIJem9zItFRdwIDAQAB-----END PUBLIC KEY-----";

export const AUTH_JWT_PRIVATE_KEY =
  process.env.AUTH_JWT_PRIVATE_KEY ||
  "-----BEGIN PRIVATE KEY-----MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrH7tcnElH7QunyEsUpivkZz7RE8h1pknXwYfxv/+gyfs8JV7SAtAOTGO+EqjbJIyBZI5IZo0mRlcuE3iOWi3/Fq6U3d1JuuBA/G/HcAt3edclpMs5vvEE4N3X3qv5iWDVA8gJ2sFBWLqoBdpyr9QErwrsFZDRMbb9H1oHmY1Ia1jc6CP3GnYw/ktOLt/YCWPojBIVE371IKYfc2JDM1Q8FYkHTYuDHWjHC196+RDcGnAirOQ5NMTUbs9eApthEFSVQ2rC8wiOTz21F/+oeAxtE8Zhg27tehG3wA5WA0VRwvnUZv28zvley1agCHoHBhCxx4RdRTt2Agl6b3Mi0VF3AgMBAAECggEAMom1kN1LOyXDynJ50ghdcCAZyi+YhT5uEn1Cg+AbQ8ZDH3k97rIL9h0TXAAwxD+gC1rCNpmq2AHwH1h6wzfY27w8JRT9FJhPQIINFQ5/JHLkWma36j78+V7bxbQqgBDVezOZsWdcqcrlnVfVMwfAiv2TMTQRR+bxzwGiWho8QoWNq1UcA8GGOE3vzWGrZJbgVwG43xUVDJtMem9w4QwlHLwekP3Q46Lqx1AOtesN39h/HduJtWtYGcw/t2TkIW9UibmBqZy7rkZW+4hCXhGBI6YhAUYnuyP6ZT+r1+J2aPlJeo2yIyjc6YVxoFwUR7QWtINzuBtG9v/YXfmtYCnEIQKBgQDd3E/nX4Vc7xolvoQZzN+0XWnyLqPgtAL63RLFfb8/lhnHHzca2k2eI0+P6I9etDa9c+i4l7/RM5LUkwxd8RGH6S4m8FiUkdKyaiwK1PAGRiUbWaij9WjKVjp7QhEtisQvtyMa9quwpv3C02zbD31/PqgeTmXOH0Aweh162qyeBwKBgQDFdMQ13JCkQe3GNO06EEPE+NjFkLqBVP2leDXmUVZRnHUN4OMpjCb9H0+/4rOAusCRmS9kALoeo6U9ykC5mqUViVzeTqnHXctD4llvEzSngDU/4+cbUQG3obj8JG9lupe/p3r6gRvB13nWiwVzj2wgK2SY0HGG1gaRaIS3K2nVEQKBgQCNhlJ6V9as9+GIHkYKZ0R0u/ovgU0MtAgKmye0T4jGOSvsd58hRAyrSf8g38tFMFSS+fOEfVjhTLLnY35KFtOGDVthf4QiEfuD0HKT3k3W0rws/D61iID2QZdAtV5b3N9VSM/eDWhsYboSo+gWvYTivMdlvcD3gbvisKNJkWD31QKBgCdgIqSPCHUJBK6K7WevyKPl7+xt8RNLbI1rzGvSeoEpzxnmZ8ZoQXomnVOplJwuIaqnPpEVqAfmIFSTGZcppJQH4XIfg7HTHW67G5SP4ucoJPZJr1N+MvZ4lJgLd/90V0CL2HVN+8gK/SvwazThO/GqVZQ3tPvrgEHM8vJIAQHRAoGAEjFMNmitScLogo9Cq5oX88/KpDOfCi+IG19g0HdaepgzreDzallcKf/XnXX9d7wuTuoSRNsq7RfCmLAUlzC+Waw0dpwLkZjgeVvFdrADGOFDKEovesZ0NBQ+Ln0SXJVRaynRxgnrjYINE+1I3uE8XZie4NMh5pybTXBpyx/cIz0=-----END PRIVATE KEY-----";

export const REDIS_URL =
  (PROCESS == Process.Prod && process.env.REDIS_URL) ||
  "redis://localhost:6379";

export const TWILLO_ACCOUNT_SID = process.env.TWILLO_ACCOUNT_SID || "";

export const TWILLO_TOKEN = process.env.TWILLO_TOKEN || "";

export const TWILLO_NUMBER = process.env.TWILLO_NUMBER || "";

export const REDIS_SECRET = process.env.REDIS_SECRET || "04eec09f";

export const GMAIL = process.env.GMAIL || "";

export const GMAIL_APP_PASS = process.env.GMAIL_APP_PASS || "";

export const MAIL_SERVICE = process.env.MAIL_SERVICE || "gmail";

export const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || "";

export const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || "";

export const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || "";

export const R2_ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

export const R2_TOKEN = process.env.R2_TOKEN || "";

export const PRIVATE_KEY_ENCRYPTION_KEY =
  process.env.PRIVATE_KEY_ENCRYPTION_KEY ||
  "e53e0e6fb7120f8793e0127371f6265a52e9baecdbf3e336f7965a6b5bad9282";
