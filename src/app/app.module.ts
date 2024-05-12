import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { CacheService } from './services/cache.service';
import { CacheInterceptor } from './interceptors/cache.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ProfileComponent,
    SearchComponent,
    SkeletonLoaderComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [
    CacheService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
