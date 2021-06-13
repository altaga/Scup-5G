import * as React from "react";
import { Editor, EditorTools } from "@progress/kendo-react-editor";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

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

class MyEditor extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
      
    constructor(props) {
        super(props)
        const { cookies } = this.props;
        if(this.props.patient===0){
            cookies.set(this.props.patient, "<p>NaN</p>", { path: '/' });
        }
        this.state = {
            mydata1: cookies.get(this.props.patient),
            patient:this.props.patient
            }
        this.handlerChange = this.handlerChange.bind(this);
    }

    handlerChange(event){
        if(this.props.patient!==0){
            const { cookies } = this.props;
            cookies.set(this.props.patient, event.html, { path: '/' });
            this.setState({
                mydata1:cookies.get(this.props.patient)
            })
        }        
    }

    componentDidUpdate(){
        const { cookies } = this.props;
        if(this.state.patient!==this.props.patient){
            if(cookies.get(this.props.patient)===undefined)
            {
                cookies.set(this.props.patient, "<p></p>", { path: '/' });
                this.setState({
                    mydata1:"<p></p>",
                    patient:this.props.patient
                })
            }
            else{
                this.setState({
                    mydata1:cookies.get(this.props.patient),
                    patient:this.props.patient
                })
            }
            
        }
    }

    render() {
        return (
            <div>
            <Editor
                tools={[
                    [Bold, Italic, Underline, Strikethrough],
                    [Subscript, Superscript],
                    [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                    [Indent, Outdent],
                    [OrderedList, UnorderedList],
                    [Link, Unlink, InsertImage, ViewHtml],
                    [Undo, Redo],
                    [FontSize,
                    FontName,
                    FormatBlock],
                    [InsertTable],
                    [AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter],
                    [DeleteRow, DeleteColumn, DeleteTable],
                    [MergeCells, SplitCell],
                ]}
                contentStyle={{
                    height: window.innerHeight / (2.4),
                }}
                value={this.state.mydata1}
                onChange={this.handlerChange}
            />
            <div style={{marginBottom:"50px"}} />
            </div>
        );
    }
}
export default withCookies(MyEditor);