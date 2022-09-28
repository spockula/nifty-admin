import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IArtwork, meta } from '../interfaces/presentation.interface';
import { BehaviorSubject, map } from 'rxjs';
import { environment, niftyKey } from 'src/environments/environment';
import * as artWorkJson from 'src/assets/data/artwork.json';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private subjectNftCard: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  private subjectNftMeta: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  chain: string = 'avalanche';
  userToken: string = '';
  private dataStore: { artworks: IArtwork[] } = { artworks: [] }; // store our data in memory
  constructor(public httpClient: HttpClient) {
    console.log(this.userToken)
    this.userToken = this.getLoggedInUserData().access_token;
    if (!localStorage.getItem('currentChain') || localStorage.getItem('currentChain') === undefined || localStorage.getItem('currentChain') === null) {
      this.chain = 'avalanche';
    } else {
      this.chain = localStorage.getItem('currentChain') || '';
    }
   }


  fetchArtWorkFromMain(page: number, limit: number) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('api-key', niftyKey);
    headers = headers.append('chain', this.chain);
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);
    this.httpClient.get<IArtwork []>(`${environment.baseApiUrl}list-tokens?page=${page}&limit=${limit}`, {headers}).pipe(map((res: any) => {
      res['data']['items'].forEach((item: any) => {
        this.dataStore.artworks.push({
          id: item.id,
          category: item.category,
          tags: item.tags,
          auctions: item.auctions,
          owner: {
            id: item.id,
            image: item.media[0]?.media,
            username: item.owner
          },
          creator: {
            id: item.id,
            image: item.media[0]?.media,
            username: item.issuer,
            type: item.type
          },
          featuredImage: {
            media: item.media[0]?.media,
            mediaType: 0
          },
          chain: item.chain,
          isApproved: item.isApproved,
          isBidding: item.hasActiveAuction,
          gallery: item.media,
          description: item.description,
          price: 0,
          currency: item.currency,
          likes: 0,
          hasActiveAuction: item.hasActiveAuction,
          lastAuctionId: item.lastAuctionId,
          symbol: item.symbol,
          name: item.name,
          tokenId: parseInt(item.tokenId),
          dateIssued: new Date(parseInt(item.dateIssued)*1000),
          sold: item.sold,
          assetType: item.assetType,
          type: item.type
        })
     });
      // this.subjectNftMeta.next(res['data']['meta']);
    }))

  }

  fetchUnapproved(page: number, limit: number) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('api-key', niftyKey);
    headers = headers.append('chain', this.chain);
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);
    this.httpClient.get<IArtwork []>(`${environment.baseApiUrl}list-tokens?page=${page}&limit=${limit}`, {headers}).pipe(map((res: any) => {
      res['data']['items'].forEach((item: any) => {
        this.dataStore.artworks.push({
          id: item.id,
          category: item.category,
          tags: item.tags,
          auctions: item.auctions,
          owner: {
            id: item.id,
            image: item.media[0]?.media,
            username: item.owner
          },
          creator: {
            id: item.id,
            image: item.media[0]?.media,
            username: item.issuer,
            type: item.type
          },
          featuredImage: {
            media: item.media[0]?.media,
            mediaType: 0
          },
          chain: item.chain,
          isApproved: item.isApproved,
          isBidding: item.hasActiveAuction,
          gallery: item.media,
          description: item.description,
          price: 0,
          currency: item.currency,
          likes: 0,
          hasActiveAuction: item.hasActiveAuction,
          lastAuctionId: item.lastAuctionId,
          symbol: item.symbol,
          name: item.name,
          tokenId: parseInt(item.tokenId),
          dateIssued: new Date(parseInt(item.dateIssued)),
          sold: item.sold,
          assetType: item.assetType,
          type: item.type
        })
     });
      this.subjectNftMeta.next(res['data']['meta']);
    })).subscribe((result: any) => {
      this.subjectNftCard.next(Object.assign({}, this.dataStore).artworks.filter((res: any) => res.isApproved === false));
    }, err => {
      return {
        status: 'Error',
        message: 'There was an error getting data'
      }
    })

  }

  getMeta() {
    return this.subjectNftMeta;
  }

  returnArtwork() {
    return this.subjectNftCard;
  }

  toggleApproved(tokenId: number) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('api-key', niftyKey);
    headers = headers.append('chain', this.chain);
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);
    return this.httpClient.post(`${environment.baseApiUrl}${tokenId}/toggle-approved`, {}, {headers})
  }

  getSubscribers() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('api-key', niftyKey);
    headers = headers.append('chain', this.chain);
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);
    return this.httpClient.get(`${environment.extraUrl}admin/subscribers`, {headers})
  }

  getContactUs() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('api-key', niftyKey);
    headers = headers.append('chain', this.chain);
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);
    return this.httpClient.get(`${environment.extraUrl}admin/messages`, {headers})
  }

  getAllUsers() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('api-key', niftyKey);
    headers = headers.append('chain', this.chain);
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);
    return this.httpClient.get(`${environment.extraUrl}admin/all-users`, {headers})
  }

  login(email: string, password: string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('api-key', niftyKey);
    var user = JSON.stringify({
      "email": email,
      "password": password
    });
    return this.httpClient.post(`${environment.extraUrl}auth/login`, user, {headers})
  }

  getLoggedInUserData() {
     var storedUser = JSON.parse(localStorage.getItem("user")|| '');
     return storedUser
  }

  addAdminUser(adminData: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('api-key', niftyKey);
    headers = headers.append('Authorization', 'Bearer ' + this.userToken);
    var user = JSON.stringify({
      "firstName": adminData.firstName,
      "lastName": adminData.lastName,
      "username": adminData.username,
      "email": adminData.email,
      "password": adminData.password,
      "walletAddress": adminData.walletAddress,
      "about": adminData.about || 'https://app.niftyrow.io',
      "webUrl": adminData.webUrl || 'https://app.niftyrow.io',
      "social": {
          "twitterUrl": "https://www.twitter.com/niftyrow",
          "facebookUrl": "https://www.facebook.com/niftyrow",
          "telegramUrl": "https://www.telegram.com/niftyrow",
          "youtubeUrl": "https://www.youtube.com/niftyrow",
          "pinterestUrl": "https://www.pinterest.com/niftyrow",
          "discordUrl": "https://www.discord.com/niftyrow",
      },
      "role": "admin"
    });
    return this.httpClient.post(`${environment.extraUrl}admin/add-admin-user`, user, {headers})

  }

}
