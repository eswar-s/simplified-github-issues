import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'ds-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ds';
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'issue-closed',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/issue-closed.svg'));
    iconRegistry.addSvgIcon(
      'issue-opened',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/issue-opened.svg'));
    iconRegistry.addSvgIcon(
      'merged',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/merged.svg'));
    iconRegistry.addSvgIcon(
      'pull-request',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/pull-request.svg'));
  }
}
