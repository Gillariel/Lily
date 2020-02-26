export declare namespace Platform {
  type Platform = {
    id:	number,
    name:	string,
    alias:	string,
    icon:	string,
    console:	string,
    controller:	string,
    developer:	string,
    overview?:	string
  }
  type PlatformSkinny = {
    id:	number,
    name:	string,
    alias:	string
  }
  type Platforms = {
    code:	number,
    status:	string,
    remaining_monthly_allowance: number,
    extra_allowance: number,
    data:	{
      count: number,
      platforms: {
        [key: number]: PlatformSkinny
      }
    }
  }
  type PlatformsByPlatformID ={
    code: number,
    status: string,
    remaining_monthly_allowance: number,
    extra_allowance: number,
    data:	{
      count: number,
      platforms: {
        [key: string]: Array<Platform>
      }
    }
  }
  type PlatformsByPlatformName = {
    code: number,
    status: string,
    remaining_monthly_allowance: number,
    extra_allowance: number,
    data:	{
      count: number,
      platforms:	Array<Platform>
    }
  }
  type PlatformsImages = {
    code: number,
    status: string,
    remaining_monthly_allowance: number,
    extra_allowance: number,
    pages: {

    },
    data:	{
      count: number,
      base_url:	Array<Others.ImageBaseUrlMeta>,
      images:	{
        [key: string]: Array<Others.PlatformImage>
      }
    }
  }
  enum PlatformFields {
    icon, console, controller, developer, manufacturer, media, cpu, memory, graphics, sound, maxcontrollers, display, overview, youtube
  }
  enum PlatformImageFilter {
    fanart, banner, boxart
  }
}

export declare namespace Game {
  type Game = {
    id: number,
    game_title:	string,
    release_date:	string,
    platform:	number,
    players: number,
    overview:	string,
    last_updated:	string,
    rating:	string,
    coop:	string,
    youtube:string,
    os:	string,
    processor:string,
    ram: string,
    hdd: string,
    video: string,
    sound: string,
    developers:	Array<number>,
    genres:	Array<number>,
    publishers:	Array<number>,
    alternates:	Array<string>
  }

  type GamesByGameID = {
    code: number,
    status: string,
    remaining_monthly_allowance: number,
    extra_allowance: number,
    pages: {
      previous: string,
      current: string,
      next: string
    },
    data:	{
      count: number,
      games: Array<Game>
    },
    include: {
      boxart:	{
        base_url:	Others.ImageBaseUrlMeta,
        data:	{
          [key: string]: Others.GameImage
        }
      },
      platform:	{
        data:	{
          [key: string]: Platform.PlatformSkinny
        }
      }
    }
  }
  type GamesByGameID_v1 = {
    code: number,
    status: string,
    remaining_monthly_allowance: number,
    extra_allowance: number,
    pages: {
      previous: string,
      current: string,
      next: string
    }
    data:	{
      count: number,
      minimum: 0,
      games: Array<Game>
    },
    include: {
      boxart: {

      },
      platform: Platform.Platform
    }
  }
  type GamesImages = {
    code: number,
    status: string,
    remaining_monthly_allowance: number,
    extra_allowance: number,
    pages: {
      previous: string,
      current: string,
      next: string
    },
    data:	{
      count: number,
      base_url:	Others.ImageBaseUrlMeta,
      images:	{
        [key: string]: Others.GameImage
      }
    }
  }
  type GamesUpdates = {
    code: number,
    status: string,
    remaining_monthly_allowance: number,
    extra_allowance: number,
    pages: {
      previous: string,
      current: string,
      next: string
    },
    data: {
      count: number,
      updates: Array<Others.UpdateModel>
    }
  }
  enum GameInclude {
    boxart, platform
  }
  enum GameFields {
    players, publishers, genres, overview, last_updated, rating, platform, coop, youtube, os, processor, ram, hdd, video, sound, alternates
  }
  enum GameImageFilter {
    fanart, banner, boxart, screenshot, clearlogo
  }
}

export declare namespace Genre {
  type Genre = {
    id:	number,
    name:	string
  }
  type Genres = {
    code:	number,
    status:	string,
    remaining_monthly_allowance: number,
    extra_allowance: number,
    data:	{
      count: number,
      genres:	{
        [key: string]: Array<Genre>
      }
    }
  }
}

export declare namespace Developer {
  type Developer = {
    id:	number,
    name:	string
  }
  type Developers = {
    code:	number,
    status:	string,
    remaining_monthly_allowance: number,
    extra_allowance: number,
    data:	{
      count: number,
      developers:	{
        [key: string]: Array<Developer>
      }
    }
  }
}

export declare namespace Publisher {
  type Publisher = {
    id:	number,
    name:	string
  }
  type Publishers = {
    code:	number,
    status:	string,
    remaining_monthly_allowance: number,
    extra_allowance: number,
    data:	{
      count: number,
      publishers:	{
        [key: string]: Array<Publisher>
      }
    }
  }
}

export declare namespace Others {
  type ImageBaseUrlMeta = {
    original:	string,
    small: string,
    thumb: string,
    cropped_center_thumb:	string,
    medium:	string,
    large: string
  }
  type PlatformImage = {
    id: number,
    type: string,
    filename: string
  }
  type GameImage = {
    id: number
    type: string
    side: string
    filename: string,
    resolution: string
  }
  type UpdateModel = {
    edit_id: number,
    game_id: number,
    timestamp: string,
    type: string,
    value:	string
  }
}