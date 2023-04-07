import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input() item:string | undefined

//output() - it is used to hold data from parent compnt
  @Output() onCancel = new EventEmitter();

//output() - it is used to hold data from child compnt
  @Output() onDelete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  cancel(){
    // alert('Clicked')
    this.onCancel.emit()   // onCancel - userdefined event
  }

  delete(){
    // alert('clicked')
    this.onDelete.emit(this.item)   // onCancel - userdefined event
    

  }

}
