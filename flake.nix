{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = import nixpkgs { inherit system; };
      in rec {
        devShells = {
          default = pkgs.mkShell {
            name = "env";
            buildInputs = with pkgs; [
              nodejs_22

              # linters & formatters
              nixfmt
              nodePackages.prettier

              # language servers
              nodePackages.bash-language-server
              nodePackages.typescript-language-server
              nodePackages.vscode-langservers-extracted
            ];

            shellHook = ''
              export PATH="$PWD/node_modules/.bin:$PATH"
            '';
          };
        };
      });
}
