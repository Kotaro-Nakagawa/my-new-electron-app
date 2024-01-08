import Contact from "./infoParts/contact"
import License from "./infoParts/license"

interface Info {
  title: string
  summary?: string
  description?: string
  termsOfService?: string
  Contact?: Contact
  license?: License
  version: string
}

export default Info