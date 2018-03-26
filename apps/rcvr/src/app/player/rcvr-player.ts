import {Component, OnChanges, OnInit} from '@angular/core'
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { FirestoreService } from '@sgnl/fire';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import {SigEvents, Signal, Status} from '@sgnl/signal'
import { Observable } from 'rxjs/Observable';
import {VgAPI} from 'videogular2/core'
import {AppSettings, AppSettingsService} from '../settings/service'



export interface INode {
  id: number;
  source: string;
  name: string;
}


@Component({
  selector: 'rcvr-player',
  template: `
    <h2 class="heading">RCVR_</h2>
    <h2 class="heading">status : {{  (status$ | async)?.state}}</h2>

    <!--<h2 class="heading">Receives Commands {{ status$ | async | json }}</h2>-->

    <!--<button class="set" (click)="setTime()">set to 80</button>-->
    
    <button class="local L" (click)="onSelectNode(0)">Set to left Node</button>
    <button class="local R" (click)="onSelectNode(1)">Set to right Node</button>
    <!---->
    <!--<button class="set setL" (click)="onSelectNode(0)">L</button>-->
    <!--<button class="set setR" (click)="onSelectNode(1)">R</button>-->

    <sig-player (playerReady)="getVideoApi($event)"
      [video]="selectedNode"></sig-player>
  `,
  styleUrls: ['rcvr-player.scss']
})
export class PlayerComponent implements OnInit {
  private statusDoc: AngularFirestoreDocument<Status>;

  settings: AppSettings;

  state;
  api: VgAPI;
  media;
  node;
  id;


  statusRef = '/status/prism_account_001_installation_id';

  status$: Observable<Status>;

  selectedNode: INode = { id: null } as INode;

  nodes: Array<INode> = [
    {id: 0, source: 'assets/media/l.mp4', name: 'Left Node'},
    {id: 1, source: 'assets/media/r.mp4', name: 'Right Node'},
    {id: 2, source: 'http://assets14.ign.com/videos/zencoder/2016/10/19/640/7fbd4dff4a907e2bb94b92c3372d6e40-500000-1476921194-w.mp4', name: 'Node Three'},
    {id: 3, source: 'http://assets14.ign.com/videos/zencoder/2015/8/14/640/3494db07bf4565c213110558c22da978-500000-1439510425-w.mp4', name: 'Node Four'}
  ];



  constructor(private signal: Signal,private appSettingsService: AppSettingsService, private _hotkeysService: HotkeysService, private afs: AngularFirestore) {
    this.statusDoc = afs.doc<Status>(this.statusRef)
    this.status$ = this.statusDoc.valueChanges()

    console.log('the status',this.status$)

    this._hotkeysService.add(
      new Hotkey('meta+shift+g', (event: KeyboardEvent): boolean => {
        console.log('Typed hotkey');
        return false; // Prevent bubbling
      })
    );
  }

  ngOnInit() {

    this.appSettingsService.getSettings()
      .subscribe(settings => {
          this.settings = settings
          const node = this.settings.node;
          this.onSelectNode(node)
      },
        () => null,
        () => {
          // this.id = new Product();
          // this.product.url = this.settings.defaultUrl;
        });

    // ${account_id}/${installation_id}/${node_id}/${status}

    const change = this.status$.subscribe((status: Status) => {
      const time = status.currentTime;
      const state = status.state
      // this.api.seekTime(time)

      if (state === 'playing') {
        setInterval( () => {

          if(new Date().getSeconds() === 30) {
            console.log('sync')
            this.api.play()
          }
        }, 10)

      }
      else if (state === 'pause') {
        setInterval( () => {

          if(new Date().getSeconds() === 30) {
            console.log('sync')
            this.api.pause()
          }
        }, 10)

      } else {
        setInterval( () => {

          if(new Date().getSeconds() === 30) {
            console.log('sync')
            // this.api.seekTime(time)
          }
        }, 10)
      }
    })
  }

  getVideoApi(api: VgAPI) {
    this.api = api;
    //api.currentTime(this.status.state)
    this.media = api.getDefaultMedia();
  }

  setTime(time) {
    // const status = this.state;
    // this.api.seekTime(time)

    // console.log(status.currentTime)

  }

  onSelectNode(node) {
    if (node >= 0) {
      console.log('node selected: '+ node)
      this.selectedNode = this.nodes[node];
      this.saveSettings(node)
    } else {
      this.selectedNode = { id: null } as INode;
    }
  }

  onSetNode(id) {
    // console.log(`node set to: ${id}`)
    // this.signal.setNodeIndex(id);
    // this.onSelectNode(id)
    // await this.signal.setItem('node', id)
    this.signal.setConfigId(id)

    this.onGetNode().then(_ => {
      this.id = id;
    })
    this.onSelectNode(id)

  }

  onGetNode() {
    //await this.signal.getItem('node')
    return this.signal.getConfigId()
    // this.onSelectNode(id)
  }


  saveSettings(node): void {
    console.log('setting to :'+ node)
    this.appSettingsService.saveSettings({node, isFromLocalStorage: true});
  }

  deleteSettings(): void {
    this.appSettingsService.deleteSettings();
  }
}
