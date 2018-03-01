import {
  Component, OnInit, Input,
  ViewChild, ViewContainerRef, ReflectiveInjector,
  ComponentFactoryResolver, ComponentFactory, AfterViewInit,
  ChangeDetectorRef, AfterContentChecked, Injector
} from '@angular/core';
import { ItemNavComponent } from '../item-nav/item-nav.component';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-group-nav',
  templateUrl: './group-nav.component.html',
  styleUrls: ['./group-nav.component.scss'],
  entryComponents: [
    ItemNavComponent
  ]
})
export class GroupNavComponent implements OnInit, AfterViewInit, AfterContentChecked {

  @ViewChild('chileContainer', { read: ViewContainerRef }) chileContainer: ViewContainerRef;
  @ViewChild('chileContainerForInsert', { read: ViewContainerRef })
  chileContainerForInsert: ViewContainerRef;
  @Input() data: { dirtype: 'group' | 'item', text: string, subs?: any[] };
  @Input() treeNodeIndex = 0;

  isInitData = false;
  isChileExpanded = false;

  constructor(
    private resolver: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef,
    private injector: Injector,
    public dataService: DataServiceService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
  ngAfterContentChecked() {
    if (!this.isInitData) {
      this.computeComponent();
      this.isInitData = true;
    }
  }

  computeComponent() {
    if (!this.data) {
      return;
    }
    if (this.data.dirtype === 'group') {
      this.data.subs.forEach(item => {
        if (item.dirtype === 'item') {
          const factoryItem = this.resolver.resolveComponentFactory(ItemNavComponent);
          const resolveInputsItem = ReflectiveInjector.resolve([
            { provide: 'data', useValue: this.data }
          ]);
          const componentRefItem = factoryItem.create(ReflectiveInjector.fromResolvedProviders(
            resolveInputsItem, this.chileContainer.injector
          ));
          componentRefItem.instance.data = item;
          componentRefItem.instance.treeNodeIndex = this.treeNodeIndex + 1;
          this.chileContainerForInsert.insert(componentRefItem.hostView);
        } else {
          const factory = this.resolver.resolveComponentFactory(GroupNavComponent);
          const resolveInputs = ReflectiveInjector.resolve([
            { provide: 'data', useValue: item }
          ]);
          const componentRef = factory.create(ReflectiveInjector.fromResolvedProviders(
            resolveInputs, this.chileContainer.injector
          ));
          componentRef.instance.data = item;
          componentRef.instance.treeNodeIndex = this.treeNodeIndex + 1;
          this.chileContainerForInsert.insert(componentRef.hostView);
        }
      });
    } else {
      const factory = this.resolver.resolveComponentFactory(ItemNavComponent);
      const resolveInputs = ReflectiveInjector.resolve([
        { provide: 'data', useValue: this.data }
      ]);
      const componentRef = factory.create(ReflectiveInjector.fromResolvedProviders(
        resolveInputs, this.chileContainer.injector
      ));
      componentRef.instance.data = this.data;
      componentRef.instance.treeNodeIndex = this.treeNodeIndex + 1;
      this.chileContainerForInsert.insert(componentRef.hostView);
    }
  }

}
