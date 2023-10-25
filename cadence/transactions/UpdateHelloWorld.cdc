import "HelloWorld"

transaction(greeting: String) {

  prepare(acct: AuthAccount) {
    log(acct.address)
  }

  execute {
    HelloWorld.changeGreeting(newGreeting: greeting)
  }
}
