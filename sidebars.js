module.exports = {
  docs: {
    en: [
      {
        type: "category",
        label: "Conflux Portal",
        items: [{ type: "doc", id: "introduction" }]
      },
      {
        type: "category",
        label: "Main Concepts",
        items: [
          { type: "doc", id: "getting_started" },
          { type: "doc", id: "common_terms" },
          { type: "doc", id: "initializing_dapps" },
          { type: "doc", id: "accessing_accounts" },
          { type: "doc", id: "sending_transactions" }
        ]
      },
      {
        type: "category",
        label: "Examples",
        items: [{ type: "doc", id: "e2e_test_demo" }]
      },
      {
        type: "category",
        label: "API Reference",
        items: [
          { type: "doc", id: "provider_api" },
          { type: "doc", id: "json_rpc_api" },
          { type: "doc", id: "experimental_api" },
          {
            type: "category",
            label: "Signning Data",
            items: [
              { type: "doc", id: "signing_data_with_portal" },
              { type: "doc", id: "cfx_sign" },
              { type: "doc", id: "sign_typed_data_v1" },
              { type: "doc", id: "sign_typed_data_v3" },
              { type: "doc", id: "sign_typed_data_v4" }
            ]
          }
        ]
      },
      {
        type: "category",
        label: "Reference",
        items: [{ type: "doc", id: "best_practices" }]
      }
    ]
  }
};
