export class Target {
  constructor(public id: string,
      public displayname: string,
      public avatars: Avatar[]) {}
}

export class Avatar {
  constructor(
    public url: string,
    public width: number,
    public height: number
  ) {}
}
