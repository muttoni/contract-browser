import CodeEditor from '@/components/CodeEditor'
import { Separator } from '@/components/ui/separator'

export default function DeploymentPage () {
  
  return (
    <>
      <div>
        <h3 className="text-lg font-medium">Deploy a new contract</h3>
        <p className="text-sm text-muted-foreground">
          Paste or upload your contract code here and click "Deploy" to deploy it to the blockchain.
        </p>
      </div>
      <Separator className="my-4" />

      <CodeEditor mustBeAuthedToViewCode={true} />
    </>
  );
};

