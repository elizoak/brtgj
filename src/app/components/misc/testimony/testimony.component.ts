import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.scss']
})
export class TestimonyComponent implements OnInit {
  testimonies = [
    {name: 'Grace Thato Ndumiso', content: 'Thanks to Dailycryptomine, I invest and I made my profit successful'},
    {name: 'Velisphomiya', content: 'This Brooker is really legit, I invested and got my profit without stress'},
    {name: 'Darmain Grayson', content: `Dailycryptomine as really change my financial
      status thanks to them I invested and earned successful`},
    {name: 'Hagos Trip', content: `I'm really happy today the website as change my
        financial life, you should try it and do not doubt I've gain alot profit, thanks to dailycryptomine`},
    {name:'Sarah Lauren smith', content: 'This is the best website i have invested on i made huge profit within a short time'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
