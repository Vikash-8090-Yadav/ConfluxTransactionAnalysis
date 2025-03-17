import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95">
      <Navbar />
      <div className="flex-1 container mx-auto p-6">
        <div className="max-w-4xl mx-auto mt-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Conflux Transaction Analyzer
          </h2>
          <div className="bg-card rounded-lg shadow-lg p-6 border border-border/50">
            <p className="text-muted-foreground mb-4">
              Welcome to the Conflux Transaction Analyzer. Connect your MetaMask wallet to start analyzing transactions
              on the Conflux blockchain.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-background rounded-md p-4 border border-border/50">
                <h3 className="font-medium mb-2">Real-time Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed analysis of transactions on the Conflux blockchain in real-time.
                </p>
              </div>
              <div className="bg-background rounded-md p-4 border border-border/50">
                <h3 className="font-medium mb-2">Secure Connection</h3>
                <p className="text-sm text-muted-foreground">
                  Connect securely with MetaMask to access your Conflux wallet and transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

