var mydb = (function() {
    var db = openDatabase("main", '1.0.0','', 1024 * 1024 * 2);

    return {
        /**
          * 执行sql，回调返回影响条数
          */
         execute:function( sql, param, callback ) {
             //参数处理
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
          * 执行sql，回调返回sql查询对象
          * 查询时，有数据返回数组，无数据返回0
          * 增删改时：返回int，影响条数
          * void query( string[, function])
          * void query( string[, array[, function]])
          */
         query:function(sql, param, callback){
            //参数处理
            if( !param ){
                param = [];
            }else if(typeof param == 'function' ){
                callback = param;
                param = [];
            }

            alert("5555");
            var self=this;
            //只有一个参数
            db.transaction(function (tx) {
                //4个参数：sql，替换sql中问号的数组，成功回调，出错回调
                tx.executeSql(sql,param,function(tx,result){
                    if (typeof callback == 'function' ){
                        callback(result);
                    }
                },self.onfail) ;
            })
        },

        /**
         * 插入，回调返回last id
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
         * 修改，回调返回影响条数
         * void update( string, object[, string[, function]])
         * void update( string, object[, string[, array[, function]]])
         */
        update:function( table, data, where, param, callback ){
            //参数处理
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
         * 删除
         * void toDelete( string, string[, function]])
         * void toDelete( string, string[, array[, function]])
         */
        toDelete:function( table, where, param, callback ){
            //参数处理
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
         * 查询，回调返回结果集数组
         * void fetch_all( string[, function] )
         * void fetch_all( string[, param[, function]] )
         */
        fetchAll:function( sql, param, callback ){
            //参数处理
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
         * 查询表的信息
         * table_name: 表名称，支持 % *，
         */
        showTables:function( table_name, callback){
            this.fetchAll("select * from sqlite_master where type='table' and name like ?", [table_name], callback);
        },


        /**
         * 组装查询条件
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
         * 错误处理
         */
        onfail:function(tx,e){
            alert('sql error: '+e.message);
            console.log('sql error: '+e.message);
        }
    };
})();