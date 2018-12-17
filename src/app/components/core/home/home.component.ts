import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    time = 0.00000000;
    timestorage;
    constructor(
        private title: Title,
        private meta: Meta
    ) {

    }

    ngOnInit() {
        Observable.interval(2000).subscribe(x => {
             this.clock();

          });
        this.title.setTitle('Home / Angular SSR');
        this.meta.updateTag({
            'description': 'Welcome to home section'
        });
    }
    clock() {
        this.time  = this.time + 0.0001;
   //     console.log(this.time);
        this.timestorage =  JSON.stringify(this.time);
        localStorage.setItem('btcpro', this.timestorage);
        this.timestorage = JSON.parse(localStorage.getItem('btcpro'));
      //  console.log(this.timestorage);
    }
}
