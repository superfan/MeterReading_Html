var mydb = (function() {
    var db = openDatabase("main", '1.0.0','', 1024 * 1024 * 2);

    return {
        /**
          * ִ��sql���ص�����Ӱ������
          */
         execute:function( sql, param, callback ) {
             //��������
            if( !param ){
                param = [];
            }else if(typeof param == 'function' ){
                callback = param;
                param = [];
            }

             this.query( sql, param, function(result){
                 if( typeof callback == 'function' ){
                     callback(result.rowsAffected);
                 }
             });
         },

         /**
          * ִ��sql���ص�����sql��ѯ����
          * ��ѯʱ�������ݷ������飬�����ݷ���0
          * ��ɾ��ʱ������int��Ӱ������
          * void query( string[, function])
          * void query( string[, array[, function]])
          */
         query:function(sql, param, callback){
            //��������
            if( !param ){
                param = [];
            }else if(typeof param == 'function' ){
                callback = param;
                param = [];
            }

            alert("5555");
            var self=this;
            //ֻ��һ������
            db.transaction(function (tx) {
                //4��������sql���滻sql���ʺŵ����飬�ɹ��ص�������ص�
                tx.executeSql(sql,param,function(tx,result){
                    if (typeof callback == 'function' ){
                        callback(result);
                    }
                },self.onfail) ;
            })
        },

        /**
         * ���룬�ص�����last id
         * void insert( string, object[, function])
         */
        insert:function( table, data, callback ){
            if( typeof data != 'object' && typeof callback == 'function' ){
                callback(0);
            }

            var k=[];
            var v=[];
            var param=[];
            for(var i in data ){
                k.push(i);
                v.push('?');
                param.push(data[i]);
            }
            var sql="INSERT INTO "+table+"("+k.join(',')+")VALUES("+v.join(',')+")";

            this.query(sql, param, function(result){
                if ( typeof callback == 'function' ){
                    callback(result.insertId);
                }
            });
        },

        /**
         * �޸ģ��ص�����Ӱ������
         * void update( string, object[, string[, function]])
         * void update( string, object[, string[, array[, function]]])
         */
        update:function( table, data, where, param, callback ){
            //��������
            if( !param ){
                param = [];
            }else if(typeof param == 'function' ){
                callback = param;
                param = [];
            }

            var set_info = this.mkWhere(data);
            for(var i=set_info.param.length-1;i>=0; i--){
                param.unshift(set_info.param[i]);
            }
            var sql = "UPDATE "+table+" SET "+set_info.sql;
            if( where ){
                sql += " WHERE "+where;
            }

            this.query(sql, param, function(result){
                if( typeof callback == 'function' ){
                    callback(result.rowsAffected);
                }
            });
        },

        /**
         * ɾ��
         * void toDelete( string, string[, function]])
         * void toDelete( string, string[, array[, function]])
         */
        toDelete:function( table, where, param, callback ){
            //��������
            if( !param ){
                param = [];
            }else if(typeof param == 'function' ){
                callback = param;
                param = [];
            }

            var sql = "DELETE FROM "+table+" WHERE "+where;
            this.query(sql, param, function(result){
                if( typeof callback == 'function' ){
                    callback(result.rowsAffected);
                }
            });
        },

        /**
         * ��ѯ���ص����ؽ��������
         * void fetch_all( string[, function] )
         * void fetch_all( string[, param[, function]] )
         */
        fetchAll:function( sql, param, callback ){
            //��������
            if( !param ){
                param = [];
            }else if(typeof param == 'function' ){
                callback = param;
                param = [];
            }

            this.query( sql, param, function(result){
                if (typeof callback == 'function' ){
                    var out=[];

                    if (result.rows.length){
                        for (var i=0;i<result.rows.length;i++){
                            out.push(result.rows.item(i));
                        }
                    }

                    callback(out);
                }
            });
        },

        /**
         * ��ѯ�����Ϣ
         * table_name: �����ƣ�֧�� % *��
         */
        showTables:function( table_name, callback){
            this.fetchAll("select * from sqlite_master where type='table' and name like ?", [table_name], callback);
        },


        /**
         * ��װ��ѯ����
         */
        mkWhere:function(data){
            var arr=[];
            var param=[];
            if( typeof data === 'object' ){
                for (var i in data){
                    arr.push(i+"=?");
                    param.push(data[i]);
                console.log('data.i:'+i);
                }
            }
            return {sql:arr.join(' AND '),param:param};
        },

        /**
         * ������
         */
        onfail:function(tx,e){
            alert('sql error: '+e.message);
            console.log('sql error: '+e.message);
        }
    };
})();