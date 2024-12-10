import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
declare const fabric: any;

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements AfterViewInit {


  @ViewChild('fabricCanvas', { static: true }) fabricCanvas!: ElementRef<HTMLCanvasElement>;
  private canvas: any;

  ngAfterViewInit(): void {
    this.initFabricCanvas();
  }

  private initFabricCanvas(): void {

    const canvasElement = this.fabricCanvas.nativeElement;
    this.canvas = new fabric.Canvas(canvasElement, {
      width: 640,
      height: 480,
      stateful: true
    });

    this.canvas.on('object:moving', (e: any) => {
      const obj = e.target; // The object being moved
      const canvasWidth = this.canvas.width || 0;
      const canvasHeight = this.canvas.height || 0;
    
      // Ensure the object stays within canvas boundaries
      if (obj.left < 0) {
        obj.left = 0;
      }
      if (obj.top < 0) {
        obj.top = 0;
      }
      if (obj.left + obj.width * obj.scaleX > canvasWidth) {
        obj.left = canvasWidth - obj.width * obj.scaleX;
      }
      if (obj.top + obj.height * obj.scaleY > canvasHeight) {
        obj.top = canvasHeight - obj.height * obj.scaleY;
      }
    });

    

  }


  addObjectOnCanvas(type: string) {
    let object: any;
    if (type == "heading") {
      
      object = new fabric.Text('Heading 1', { lockMovementOutsideCanvas: true, fill: 'black', left: 30, top: 30});

    } else if (type == "pragraph") {
      
      object = new fabric.Text('This is paragraph text', { lockMovementOutsideCanvas: true, fill: 'black', left: 50, top: 50});

    } else if (type == "image") {

      object = new fabric.Rect({ left: 50, top: 50, lockMovementOutsideCanvas: true, fill: '#000000', width: 100, height: 100 });

    } else if (type == "icon") {

      object = new fabric.Rect({ left: 50, top: 50, lockMovementOutsideCanvas: true, fill: '#000000', width: 100, height: 100 });

    } else if (type == "squre") {

      object = new fabric.Rect({ left: 50, top: 50, lockMovementOutsideCanvas: true, fill: '#000000', width: 100, height: 100 });

    } else if (type == "circle") {
      
      object = new fabric.Circle({ radius: 100, lockMovementOutsideCanvas: true, fill: 'green', left: 60, top: 60 });

    } else if (type == "rectanle") {

      object = new fabric.Rect({ left: 50, top: 50, lockMovementOutsideCanvas: true, fill: '#000000', width: 150, height: 100 });

    }

    this.canvas.add(object);
    this.canvas.setActiveObject(object);

  }


}
