import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocPipe } from './doc.pipe';
import { FirestoreService } from './firestore.service';
import { AngularFirestore } from 'angularfire2/firestore';

export function coreServices(): Provider[] {
  return [FirestoreService, AngularFirestore];
}

@NgModule({
  imports: [CommonModule],
  declarations: [DocPipe],
  providers: coreServices()
})
export class FireModule {}
