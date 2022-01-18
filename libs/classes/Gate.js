import prisma from "../prisma";

export default class Gate {
  constructor() {
    this.currentUser = null;
  }
  async init(session) {
    if (!this.currentUser) {
      this.currentUser = await prisma.users.findUnique({
        where: { id: session?.user?.id }
      });
    }
  }
  async can(name, resource) {
    
  }
  async canot(name, resource) {
    
  }
}
