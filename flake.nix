{
  description = "felschr.com personal website development environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = inputs: {
    devShells = builtins.mapAttrs (system: pkgs: {
      default = pkgs.mkShell {
        packages = [
          pkgs.git
          pkgs.nodejs_26
        ];
      };
    }) inputs.nixpkgs.legacyPackages;
  };
}
