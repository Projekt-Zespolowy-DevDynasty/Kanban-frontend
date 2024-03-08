import { bootstrapApplication } from '@angular/platform-browser-dynamic';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app/app.component';
@NgModule({
    declarations: [
        // your components
    ],
    imports: [
        // other modules
        HttpClientModule
    ],
    providers: [],
})
export class AppModule { }

bootstrapApplication(AppModule, [AppComponent]);
