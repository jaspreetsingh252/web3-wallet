import { useState, useCallback } from 'react'
import { generateMnemonic } from 'bip39'
import { SolanaWallet } from './SolanaWallet'
import { EthWallet } from './EthWallet'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Toast } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Moon, Sun, Copy } from "lucide-react"

export default function App() {
  const [mnemonic, setMnemonic] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { toast } = useToast()

  const createMnemonic = useCallback(async () => {
    try {
      const mn = await generateMnemonic()
      setMnemonic(mn)
    } catch (error) {
      console.error("Failed to generate mnemonic:", error)
      toast({
        title: "Error",
        description: "Failed to generate mnemonic. Please try again.",
        variant: "destructive",
      })
    }
  }, [toast])

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(mnemonic).then(() => {
      toast({
        title: "Copied!",
        description: "Mnemonic copied to clipboard",
      })
    }).catch(() => {
      toast({
        title: "Error",
        description: "Failed to copy mnemonic",
        variant: "destructive",
      })
    })
  }, [mnemonic, toast])

  return (
    <div className={`min-h-screen bg-black text-blue-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto max-w-2xl p-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-500 mb-4">Wally</h1>
          <p className="text-xl">A Web3 Based Wallet</p>
        </header>

        <main className="space-y-8">
          <div className="flex justify-end">
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className="bg-blue-900"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Moon className="h-4 w-4 text-blue-300" /> : <Sun className="h-4 w-4 text-blue-300" />}
            </Switch>
          </div>

          <Button onClick={createMnemonic} className="w-full bg-blue-700 hover:bg-blue-600 text-white">
            Create Seed Phrase
          </Button>

          <div className="relative">
            <Input
              type="text"
              value={mnemonic}
              readOnly
              placeholder="Your mnemonic will appear here"
              className="bg-blue-900 text-blue-100 border-blue-700 pr-10"
            />
            {mnemonic && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-100"
                onClick={copyToClipboard}
                aria-label="Copy mnemonic to clipboard"
              >
                <Copy className="h-4 w-4" />
              </Button>
            )}
          </div>

          {mnemonic && (
            <>
              <section className="bg-blue-900 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-blue-300">Solana Wallets</h2>
                <SolanaWallet mnemonic={mnemonic} />
              </section>

              <section className="bg-blue-900 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-blue-300">Ethereum Wallets</h2>
                <EthWallet mnemonic={mnemonic} />
              </section>
            </>
          )}
        </main>

        <footer className="text-center text-sm text-blue-500 mt-12">
          <p>Created by Jaspreet</p>
        </footer>
      </div>
      <Toast />
    </div>
  )
}








