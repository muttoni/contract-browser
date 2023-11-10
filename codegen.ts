import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	documents: "./graphql/**/*/*.graphql",
	schema: [
		{
			"https://api.findlabs.io/hasura/v1/graphql": {
				headers: {
					"Authorization": `Bearer ${process.env.FLOWDIVER_API_KEY}`,
				},
			},
		},
	],
	generates: {
		"./generated/": {
			preset: "client",
		},
		'./graphql.schema.json': {
			plugins: ['introspection'],
		},
    // generate types.ts
    "graphql/types.ts": { plugins: ["typescript"] },
    // generate operations.ts
    "graphql/operations.ts": {
      preset: "import-types",
      plugins: ["typescript-operations", "typescript-urql"],
      presetConfig: {
        typesPath: "./types",
      },
      config: {
        withHooks: false,
      },
    },
	},
	hooks: { afterAllFileWrite: ["prettier --write"] },
};

export default config;