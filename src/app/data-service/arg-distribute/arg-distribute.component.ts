import {
  Component, OnInit, Input,
  ViewChild, ViewContainerRef, ReflectiveInjector,
  ComponentFactoryResolver, ComponentFactory, AfterViewInit,
  ChangeDetectorRef, AfterContentChecked, Injector
} from '@angular/core';
import { SimpleInputComponent } from '../simple-input/simple-input.component';
import { DateSelectComponent } from '../date-select/date-select.component';
import { SingleSelectComponent } from '../single-select/single-select.component';
import { MultiSelectComponent } from '../multi-select/multi-select.component';

@Component({
  selector: 'app-arg-distribute',
  templateUrl: './arg-distribute.component.html',
  styleUrls: ['./arg-distribute.component.scss']
})
export class ArgDistributeComponent implements OnInit {

  @ViewChild('chileContainer', { read: ViewContainerRef }) chileContainer: ViewContainerRef;
  @ViewChild('chileContainerForInsert', { read: ViewContainerRef })
  chileContainerForInsert: ViewContainerRef;
  @Input() data: any = null;

  constructor(
    private resolver: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef,
    private injector: Injector
  ) { }

  ngOnInit() {
    let factoryItem: any = null;
    switch (this.data.type) {
      case 'string': case 'number':
        factoryItem = this.resolver.resolveComponentFactory(SimpleInputComponent);
        break;
      case 'date':
        factoryItem = this.resolver.resolveComponentFactory(DateSelectComponent);
        break;
      case 'select':
        factoryItem = this.resolver.resolveComponentFactory(SingleSelectComponent);
        break;
      case 'multiSelect':
        factoryItem = this.resolver.resolveComponentFactory(MultiSelectComponent);
        break;
    }
    const resolveInputsItem = ReflectiveInjector.resolve([
      { provide: 'data', useValue: this.data }
    ]);
    const componentRefItem = factoryItem.create(ReflectiveInjector.fromResolvedProviders(
      resolveInputsItem, this.chileContainer.injector
    ));
    componentRefItem.instance.data = this.data;
    this.chileContainerForInsert.insert(componentRefItem.hostView);
  }

}
