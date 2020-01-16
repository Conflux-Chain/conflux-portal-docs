const { REPO, SOURCE_REPO } = process.env;
module.exports = {
  description: "ConfluxPortal project documentation",
  excludes: ["README", ".git"],
  logo: "https://www.conflux-chain.org/icons/icon-48x48.png",
  name: "ConfluxPortal",
  repo: REPO || "Conflux-Chain/conflux-portal-docs",
  sourceRepo: SOURCE_REPO || "Conflux-Chain/conflux-portal",
  root: "/conflux-portal-docs/",
  theme: true
};
