import CodeEditor from '@/components/CodeEditor'

export default function DeploymentPage () {
  
  return (
    <>
      <div className='mb-4'>
        <h3 className="text-lg font-medium">Deploy a new contract</h3>
        <p className="text-sm text-muted-foreground">
          Paste or upload your contract code here and click &quot;Deploy&quot; to deploy it to the blockchain.
        </p>
      </div>

      <CodeEditor mustBeAuthedToViewCode={true} />
    </>
  );
};

