type UsernameHistory = {
  username: string;
};

type SkinTexture = {
  url: string;
  data: string;
};

type RawTexture = {
  value: string;
  signature: string;
};

type Textures = {
  custom: boolean;
  slim: boolean;
  skin: SkinTexture;
  raw: RawTexture;
};

export type MinecraftUserDetail = {
  uuid: string;
  username: string;
  username_history: UsernameHistory[];
  textures: Textures;
  created_at: string;
};

export type IconProps = {
  strokeWidth?: string;
  svgProps?: React.SVGProps<SVGSVGElement>;
};