import * as React from "react";
import { Editor, EditorTools } from "@progress/kendo-react-editor";
const {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Subscript,
    Superscript,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Indent,
    Outdent,
    OrderedList,
    UnorderedList,
    Undo,
    Redo,
    FontSize,
    FontName,
    FormatBlock,
    Link,
    Unlink,
    InsertImage,
    ViewHtml,
    InsertTable,
    AddRowBefore,
    AddRowAfter,
    AddColumnBefore,
    AddColumnAfter,
    DeleteRow,
    DeleteColumn,
    DeleteTable,
    MergeCells,
    SplitCell,
} = EditorTools;

class MyEditorM extends React.Component {
    handlerChange(event){
        console.log(event.value.content)
    }
    render() {
        return (
            <div>
            <Editor
                style={{}}
                tools={[
                    [Bold, Italic, Underline, Strikethrough],
                    [Subscript, Superscript],
                    [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                    [Indent, Outdent],
                    [OrderedList, UnorderedList],
                    FontSize,
                    FontName,
                    FormatBlock,
                    [Undo, Redo],
                    [Link, Unlink, InsertImage, ViewHtml],
                    [InsertTable],
                    [AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter],
                    [DeleteRow, DeleteColumn, DeleteTable],
                    [MergeCells, SplitCell],
                ]}
                contentStyle={{
                    height: window.innerHeight / (2.4),
                    fontSize:"1rem"
                }}
                defaultContent={""}
                onChange={this.handlerChange}
            />
            <div style={{marginBottom:"50px"}} />
            </div>
        );
    }
}
export default MyEditorM;